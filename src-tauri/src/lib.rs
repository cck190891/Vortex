use serde::Serialize;
use std::env;
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

#[tauri::command]
fn get_cookie_path() -> String {
    #[cfg(target_os = "windows")]
    {
        let local_app_data = env::var("LOCALAPPDATA").unwrap();
        let destination = PathBuf::from(local_app_data)
            .join("com.cck.Vortex")
            .join("EBWebView")
            .join("Default")
            .join("Network")
            .join("Cookies.db");
        format!("{}", destination.display())
    }
    #[cfg(target_os = "android")]
    {
        let tmp_dir = env::var("TMPDIR").unwrap();
        let parent_dir = tmp_dir.split("/cache").next().unwrap();
        let destination = PathBuf::from(parent_dir)
            .join("app_webview")
            .join("Default")
            .join("Cookies.db");
        format!("{}", destination.display())
    }
}



fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>())
}


#[derive(Serialize)]
pub struct Cookie {
    pub name: String,
    pub value: String,
    pub domain: String,
    pub path: String,
}

#[derive(Serialize)]
pub struct Cookies {
    pub cookies: Vec<Cookie>,
    pub total: u32,
}

#[tauri::command]
async fn get_cookies_serialize(main_webview: tauri::WebviewWindow) -> Result<Cookies, String> {
    let (done_tx, done_rx) = tokio::sync::oneshot::channel::<Cookies>();
    let _ = main_webview.with_webview(|webview| unsafe {
        #[cfg(target_os = "windows")]
        {
            println!("---------------------------------get_win_cookie on---------------------------------");
            use webview2_com::{
                take_pwstr, GetCookiesCompletedHandler, Microsoft::Web::WebView2::Win32::*,
            };
            use windows::core::{Interface, PWSTR};
            let core_2 = webview
                .controller()
                .CoreWebView2()
                .unwrap()
                .cast::<ICoreWebView2_2>()
                .unwrap();
            let manager = core_2.CookieManager().unwrap();
            let _ = GetCookiesCompletedHandler::wait_for_async_operation(
                Box::new(move |handler| {
                    let _ = manager.GetCookies(None, &handler);
                    Ok(())
                }),
                Box::new(move |_result, cookielist| {
                    let cookielist = cookielist.unwrap();
                    let mut count = std::mem::MaybeUninit::<u32>::uninit();
                    let _ = cookielist.Count(count.as_mut_ptr());
                    let count = count.assume_init();
                    
                    println!("total find {:?} cookies", count);
                    let mut cookies = Vec::new();

                    for i in 0..count {
                        let cookie: ICoreWebView2Cookie = cookielist.GetValueAtIndex(i)?;
                        let mut name = PWSTR::null();
                        let mut value = PWSTR::null();
                        let mut domain = PWSTR::null();
                        let mut path = PWSTR::null();

                        cookie.Name(&mut name)?;
                        cookie.Value(&mut value)?;
                        cookie.Domain(&mut domain)?;
                        cookie.Path(&mut path)?;
                        
                        let name_str = take_pwstr(name);
                        let value_str = take_pwstr(value);
                        let domain_str = take_pwstr(domain);
                        let path_str = take_pwstr(path);

                        let cookie = Cookie {
                            name: name_str,
                            value: value_str,
                            domain: domain_str,
                            path: path_str,
                        };
                        cookies.push(cookie);
                    }
                    let total = cookies.len() as u32;
                    let cookies_data = Cookies {
                        cookies,
                        total,
                    };
                    let _ = done_tx.send(cookies_data);
                    Ok(())
                }),
            );
            println!("---------------------------------get_win_cookie off---------------------------------");
        }
    });

    match done_rx.await {
        Ok(cookies) => Ok(cookies),
        Err(_) => Err("Failed to return cookies".into()),
    }
}



#[tauri::command]
async fn del_cookies_by_domain(main_webview: tauri::WebviewWindow, domain: String) {
    let _ = main_webview.with_webview(move |webview| unsafe{
    #[cfg(target_os = "windows")]
    {
      use windows::core::{Interface, PCWSTR};
      use webview2_com::{
        GetCookiesCompletedHandler,
        Microsoft::Web::WebView2::Win32::{*},
      };
      println!("---------------------------------del_win_cookie on---------------------------------");
      let domain16: Vec<u16> = domain.encode_utf16().chain(Some(0)).collect();

      let domain_pcw = PCWSTR(domain16.as_ptr());

      let core_2 = webview.controller().CoreWebView2().unwrap().cast::<ICoreWebView2_2>().unwrap();
      let manager = core_2.CookieManager().unwrap();
      let manager_clone = manager.clone(); 

      let _ =GetCookiesCompletedHandler::wait_for_async_operation(
        Box::new(move |handler| {
          let _ = manager_clone.GetCookies(domain_pcw,&handler);
          Ok(())
        }),
        
        Box::new(move |_result, cookielist| {
          let cookielist = cookielist.unwrap();          
          let mut count_uninit = std::mem::MaybeUninit::<u32>::uninit();
          let _ =cookielist.Count(count_uninit.as_mut_ptr());
          let count = count_uninit.assume_init();
          println!("domain: {:?}", domain);
          println!("total {:?} cookies need to delete", count);
          for i in 0..count {
            let cookie: ICoreWebView2Cookie = cookielist.GetValueAtIndex(i)?;
            let _ =manager.DeleteCookie(&cookie);
          }
          Ok(())
        })

      );
      println!("---------------------------------del_win_cookie on---------------------------------");

    }        
  });
}

#[tauri::command]
fn show_cfh() {
    println!("---------------------------------setup_handler on---------------------------------");
    let context: tauri::Context<tauri::Wry> = tauri::generate_context!();  //wry for 0.38
    // let context = tauri::generate_context!();
    let config: &tauri::Config = context.config();

    println!("{:#?}", config.app);
    println!("---------------------------------setup_handler off---------------------------------");
}

#[tauri::command]
fn show_windows(window: tauri::Window) -> String {
    println!("---------------------------------setup_handler on---------------------------------");
    let hash = window.windows();
    // println!("{:#?}", windows_hash);
    let mut return_str = String::new();
    for (key, value) in &hash {
        return_str.push_str(&format!("Key: {}, Value: {:?} \n ", key, value));
    }
    println!("{:#?}", return_str);
    println!("---------------------------------setup_handler off---------------------------------");
    return_str
}

#[tauri::command]
fn show_webviewwindows(window: tauri::WebviewWindow) -> String {
    println!("---------------------------------setup_handler on---------------------------------");
    let hash = window.webview_windows();
    let mut return_str = String::new();
    for (key, value) in &hash {
        return_str.push_str(&format!("Key: {}, Value: {:?} \n ", key, value));
    }

    println!("{:#?}", return_str);
    println!("---------------------------------setup_handler off---------------------------------");
    return_str
}

#[tauri::command]
fn show_webviews(window: tauri::Webview) -> String {
    println!("---------------------------------setup_handler on---------------------------------");
    let hash = window.webviews();
    let mut return_str = String::new();
    for (key, value) in &hash {
        return_str.push_str(&format!("Key: {}, Value: {:?} \n ", key, value));
    }
    println!("{:#?}", return_str);
    println!("---------------------------------setup_handler off---------------------------------");
    return_str
}

#[tauri::command]
async fn do_eval(webviews: tauri::Webview, jscode: String, label: String) {
    println!("---------------------------------do_eval on---------------------------------");
    println!("label: {:?}", label);
    println!("jscode: {:?}", jscode);
    let webviewwindow = webviews.get_webview_window(&label).unwrap();
    let _ = webviewwindow.eval(&jscode);
    println!("---------------------------------do_eval off---------------------------------");
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let tauri_builder = tauri::Builder::default();

    tauri_builder
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        // .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            let main_webview = app.get_webview_window("main").unwrap();

            let _ = main_webview.with_webview(|_webview| {
        #[cfg(target_os = "linux")]
        {
          println!("---------------------------------linux on---------------------------------");
          println!("---------------------------------linux off---------------------------------");
          
        }
        
        #[cfg(target_os = "windows")]
        {
          println!("---------------------------------windows on---------------------------------");
          println!("---------------------------------windows off---------------------------------");
        }
        
        #[cfg(target_os = "android")]
        {
          println!("---------------------------------android on---------------------------------");
          println!("---------------------------------android off---------------------------------");
        }
      });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_cookie_path,
            show_cfh,
            show_windows,
            show_webviewwindows,
            show_webviews,
            do_eval,
            del_cookies_by_domain,
            get_cookies_serialize
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
