export const getImageFilename = (path:string) => {
    const pathArr = path.split("/");
    return pathArr[pathArr.length-1];
}

export const getImageType = (path:string) => path.split(".").pop();