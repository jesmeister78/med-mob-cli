import Config from "react-native-config";

export const getImageFilename = (path:string) => {
    const pathArr = path.split("/");
    return pathArr[pathArr.length-1];
}

export const getImageType = (path:string) => path.split(".").pop();

export const getImagePathPrefix = (path: string) => 
    path.startsWith("/images") ? Config.XRAI_API_HOST : "file://";
