import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import filePickerIcon from "../../assets/filepicker_icon.svg";
import { SizedBox } from "../ui";
import { useEffect, useState } from "react";
import png from "../../assets/icons/png_file.svg";
import jpg from "../../assets/icons/jpg_file.svg";
import jpeg from "../../assets/icons/jpeg_file.svg";
import pdf from "../../assets/icons/pdf_file.svg";
import cancelIcon from "../../assets/icons/cancel.svg";
import errorIcon from "../../assets/icons/error_icon.svg";
import {
  formatBytes,
  identifyFileType,
  readAndConvertFileToString,
} from "../../utils";
import { acceptedOrgFileTypes } from "../constants";

const FilePicker = ({ width, form, valueSetter }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState(form.certOfInc);
  const [convertedFile, setConvertedFile] = useState(null);
  const [fileErrorMessage, setFileErrorMessage] = useState("");

  const getFileIcon = (extension) => {
    if (extension === "png") {
      return png;
    } else if (extension === "jpg") {
      return jpg;
    } else if (extension === "jpeg") {
      return jpeg;
    } else if (extension === "pdf") {
      return pdf;
    }
  };

  // convert file once selected
  useEffect(() => {
    // if file changed
    valueSetter((prev) => ({ ...prev, certOfInc: file }));

    if (file) {
      const dataURL = readAndConvertFileToString(file);
      setConvertedFile(dataURL);
    }
  }, [file, valueSetter]);

  return (
    <>
      <label
        htmlFor="file"
        className={twMerge(
          "flex flex-col justify-center items-center border-2 border-dashed border-[#AEAEAE] py-6 dashed-border-vertical transition-all cursor-pointer hover:bg-gray-200",
          width ?? "w-[240px]",
          isDragOver ? "bg-gray-200" : null
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (
            acceptedOrgFileTypes.includes(
              identifyFileType(e.dataTransfer.files[0].type)
            )
          ) {
            setFile(null);
            setConvertedFile(null);
            setFile(e.dataTransfer.files[0]);
          } else {
            // TODO: handle wrong file type
          }
        }}
      >
        <img alt="file-picker-icon" src={filePickerIcon} />
        <SizedBox height="h-4" />
        <p className="text-[#0E0E0E] font-Inter text-center font-medium">
          Drag and drop files, or browse
        </p>
        <SizedBox height="h-2" />
        <p className="text-primary-light-gray text-center text-sm font-Inter">
          Accepted file formats include PNG, JPG and PDF
        </p>
        <input
          type="file"
          name="file-picker"
          id="file"
          accept=".png,.jpg,.jpeg,.pdf"
          className="hidden"
          // multiple={false}
          onChange={(e) => {
            // reset all fields
            setFileErrorMessage("");
            setConvertedFile(null);
            setFile(null);

            // check if file type is acceptable
            if (
              !acceptedOrgFileTypes.includes(
                e.target.files[0].type.split("/")[1]
              )
            )
              return setFileErrorMessage("File format not accepted.");

            // check if file size is greater than 5MB
            if (e.target.files[0].size > 5242880)
              return setFileErrorMessage("File size exceeds 5MB limit.");
            setFile(e.target.files[0]);
          }}
        />
      </label>
      {/* file error message */}
      {fileErrorMessage && (
        <div
          className={`w-[clamp(280px,70%,600px)] flex items-center justify-start gap-2 text-red-500 my-2`}
        >
          <img
            alt="error icon"
            src={errorIcon}
            className="fill-red-500 text-red-500"
          />
          <p>{fileErrorMessage}</p>
        </div>
      )}
      {file && (
        <>
          <SizedBox height="h-4" />
          <div
            className={twMerge(
              "px-6 py-4 border-2 border-solid border-gray-200 bg-gray-100 flex justify-start items-center gap-x-2",
              width ?? "w-[240px]"
            )}
          >
            <img
              alt="file-type"
              src={getFileIcon(identifyFileType(file.type))}
            />
            <div className="flex flex-1 overflow-hidden flex-col">
              <p className="flex-1 overflow-hidden text-ellipsis line-clamp-1 break-all w-full">
                {file.name}
              </p>
              <p className="flex-1 text-xs text-gray-500 overflow-hidden text-ellipsis">
                {formatBytes(file.size)}
              </p>
              <SizedBox height="h-2" />
              <div className="flex items-center justify-center">
                {/* Progress bar container */}
                <div className="h-[10px] flex-1 bg-gray-200 rounded-md flex items-center justify-start">
                  {/* Progress bar inner */}
                  <div
                    className={twMerge(
                      "w-0 h-full bg-step-active rounded-md transition-all duration-509",
                      convertedFile ? "w-full" : null
                    )}
                  />
                </div>
                <SizedBox width="w-2" />
                <button>
                  <img
                    alt="remove"
                    src={cancelIcon}
                    className={`transition-all hover:rotate-180 duration-500 hover:filter-color`}
                    onClick={() => {
                      setConvertedFile(null);
                      setFile(null);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

FilePicker.propTypes = {
  width: PropTypes.string,
  form: PropTypes.object,
  valueSetter: PropTypes.func,
};

export default FilePicker;