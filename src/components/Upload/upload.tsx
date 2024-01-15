import React, { FC, useRef, ChangeEvent } from "react";
import axios, { AxiosProgressEvent } from "axios";
import Button from "../Button/button";

export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const { action, beforeUpload, onProgress, onSuccess, onError, onChange } =
    props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const uploadFiles = (files: FileList) => {
    // fileList本身是个伪数组 这里将它转换成数组
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((precessedFile) => {
            post(precessedFile);
          });
        } else if (result) {
          post(file);
        }
      }
    });
  };

  const post = (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: AxiosProgressEvent) => {
          let percentage = Math.round((e.loaded * 100) / e.total!) || 0;
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        console.log(resp);
        onSuccess && onSuccess(resp.data, file);
        onChange && onChange(file);
      })
      .catch((err) => {
        console.log(err);
        onError && onError(err, file);
        onChange && onChange(file);
      });
  };

  return (
    <div className="viking-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        className="viking-file-input"
        style={{ display: "none" }}
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};