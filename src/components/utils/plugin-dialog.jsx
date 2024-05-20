import { open } from '@tauri-apps/plugin-dialog';
import Swal from 'sweetalert2';
import '../../css/plugin-dialog.css'
async function select_single({ target_name = null, isdir = false, defaultP = null }) {
  const file = await open({
    multiple: false,
    directory: isdir,
    defaultPath: defaultP,
  });

  if (isdir) {
    return file
  }
  if (target_name)
    if (file.name.toLowerCase() == target_name.toLowerCase()) {
      return file.path
    } else {
      return
    }
  return file.path
}

const checkbox_dialog = (info) => {
  return new Promise((resolve, reject) => {
    let checkboxHTML = `<div className='checkbox-text'>${info.text}</div>`;
    checkboxHTML += `<div class='checkbox-container'>`;
    info.inputOptions.forEach((option, index) => {
      checkboxHTML += `
        <label class='checkbox-label'>
          <input type='checkbox' id='checkbox${index}' class='swal2-checkbox'>
          <span class='checkbox-select'>${option}</span>
        </label>
      `;
    });
    checkboxHTML += '</>';

    Swal.fire({
      title: info.title,
      html: checkboxHTML,
      width: info.width || 'auto',
      preConfirm: () => {
        return info.inputOptions.reduce((selectedOptions, option, index) => {
          if (document.getElementById(`checkbox${index}`).checked) {
            selectedOptions.push(option);
          }
          return selectedOptions;
        }, []);
      }
    }).then((result) => {
      if (result.value) {
        console.log('您選擇的選項:', result.value);
        resolve(result.value);
      } else if (result.isDismissed) {
        console.log('使用者關閉了彈窗');
        resolve(null);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};


export { select_single, checkbox_dialog }