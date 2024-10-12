import { env } from "../environment";
import { Procedure } from "./procedure";

export const getImageFilename = (path:string) => {
    const pathArr = path.split("/");
    return pathArr[pathArr.length-1];
}

export const getImageType = (path:string) => path.split(".").pop();

export const getImagePathPrefix = (path: string) => 
    path.startsWith("/images") ? env.XRAI_API_HOST : "file://";
