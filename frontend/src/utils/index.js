import {surpriseMePrompts} from '../constant';
import fileSaver from 'file-saver';
export  {SuccessAlert, areYouSureAlert, purchaseAlert, inputAlert} from './Alerts'

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
  
    if (randomPrompt === prompt) return getRandomPrompt(prompt);
  
    return randomPrompt;
  }

export const convertBase64 = (file) => {
    return new Promise((resolve, reject)=> {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = ()=> resolve(fileReader.result);

        fileReader.onerror = (err)=> reject(err);
        
    })
}

  export async function downloadImage(_id, photo) { 
    fileSaver.saveAs(photo, `download-${_id}.jpg`);
  }

