import {
  File,
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
} from "lucide-react";
import React from "react";

const GetFileIcon = ({ extension }: { extension: string }) => {
  return (
    <div>
      {extension === "zip" && <FileArchive />}
      {(extension === "jpg" ||
        extension === "png" ||
        extension === "gif" ||
        extension === "svg" ||
        extension === "jpeg") && <FileImage />}
      {(extension === "mp4" ||
        extension === "mkv" ||
        extension === "avi" ||
        extension === "mov" ||
        extension === "wmv") && <FileVideo />}
      {(extension === "pdf" ||
        extension === "txt" ||
        extension === "epub" ||
        extension === "doc" ||
        extension === "docx" ||
        extension === "rtf") && <FileText />}
      {(extension === "mp3" ||
        extension === "wav" ||
        extension === "flac" ||
        extension === "aac") && <FileAudio />}
      {(extension === "xlsx" || extension === "xls" || extension === "csv") && (
        <FileSpreadsheet />
      )}
      {(extension === "html" ||
        extension === "css" ||
        extension === "js" ||
        extension === "ts" ||
        extension === "json" ||
        extension === "xml") && <FileCode />}
      {![
        "zip",
        "jpg",
        "png",
        "gif",
        "svg",
        "jpeg",
        "mp4",
        "mkv",
        "avi",
        "mov",
        "wmv",
        "pdf",
        "epub",
        "txt",
        "doc",
        "docx",
        "rtf",
        "mp3",
        "wav",
        "flac",
        "aac",
        "xlsx",
        "xls",
        "csv",
        "html",
        "css",
        "js",
        "ts",
        "json",
        "xml",
      ].includes(extension) && <File />}
    </div>
  );
};

export default GetFileIcon;
