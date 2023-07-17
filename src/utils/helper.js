export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export function getUniqueArray(arr = [], compareProps = []) {
  let modifiedArray = [];
  if (compareProps.length === 0 && arr.length > 0)
    compareProps.push(...Object.keys(arr[0]));
  arr.map((item) => {
    if (modifiedArray.length === 0) {
      modifiedArray.push(item);
    } else {
      if (
        !modifiedArray.some((item2) =>
          compareProps.every(
            (eachProps) => item2[eachProps] === item[eachProps]
          )
        )
      ) {
        modifiedArray.push(item);
      }
    }
  });
  return modifiedArray;
}
export function getLocalizedName(key, activeLanguage, hint = false) {
  console.log(activeLanguage);
  if (key) {
    if (!hint && key.hasOwnProperty("name_localized")) {
      let obj =  typeof key.name_localized =="string" ? JSON.parse(JSON.stringify(eval("(" + key.name_localized + ")"))) : key.name_localized;
      // let obj = JSON.stringify(eval("(" + key.name_localized + ")"));
      // obj = JSON.parse(obj);
      if (activeLanguage.code == "ar") {
        return obj.ar;
      } else {
        return obj.en;
      }
    } else {
      if (key.hints_localized) {
        let obj = typeof key.hints_localized == "string"?JSON.parse(JSON.stringify(eval("(" + key.hints_localized + ")"))) : key.hints_localized;
        // obj = JSON.parse(obj);
        if (obj.ar && obj.en) {
          if (activeLanguage.code == "ar") {
            return obj.ar;
          } else {
            return obj.en;
          }
        }
      }
    }
  } else {
    return "";
  }
}
