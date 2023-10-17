import { ChangeEvent, useState } from "react";
import ProjectTitle from "../../Titles/ProjectTitle/ProjectTitle";
import { IoChevronForwardSharp } from "react-icons/io5";
import { BsSearch, BsSun, BsMoon } from "react-icons/bs";
import { FiPlusSquare } from "react-icons/fi";
import { ISiderBarMenu } from "../Interface";
import Workspace from "../Workspace/Workspace";
import { FaCircleUser } from "react-icons/fa6";
import { GiExitDoor } from "react-icons/gi";
const SiderBarMenu: React.FC<ISiderBarMenu> = ({
  workspaceData,
  filteredWorkspace,
  setFilteredWorkspace,
  setDisplayModals,
}) => {
  const [accordionStatus, setAccordionStatus] = useState<boolean>(true);
  const [toggleDarkMode, setToggleDarkMode] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredData = workspaceData.filter((workspace) =>
      workspace.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredWorkspace(filteredData);
  };

  return (
    <>
      <div className="h-screen overflow-y-hidden flex flex-col border-s-2 ps-s border-gray-100">
        <div className="text-center mt-xl mb-m">
          <ProjectTitle />
        </div>
        <div
          className="flex items-center hover:cursor-pointer pe-12"
          onClick={() => setAccordionStatus((prevState) => !prevState)}
        >
          <span
            className={`font-black duration-300 transition ease-in-out ${
              !accordionStatus && "rotate-90"
            }`}
          >
            <IoChevronForwardSharp />
          </span>
          <p className="text-bold-m font-extrabold text-end ms-auto">
            ورک اسپیس ها
          </p>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out pe-12 ${
            accordionStatus
              ? "invisible opacity-0 h-0"
              : "visible opacity-100 h-auto"
          }`}
        >
          <div className="relative">
            <input
              className="bg-gray-100 w-full text-end text-body-s font-medium px-8 py-3 my-s rounded"
              type="text"
              placeholder="جست و جو کنید"
              onChange={(e) => handleChange(e)}
            />
            <span className="absolute top-7 right-2">
              <BsSearch />
            </span>
          </div>
          <div>
            <button
              onClick={() => {
                setDisplayModals((prevState) => ({
                  ...prevState,
                  nameModal: true,
                }));
              }}
              className="flex items-center justify-center text-black bg-gray-100 hover:bg-gray-200 transition rounded-md w-transparent border-1 border-brand-primary p-2.5 text-body-sm my-xs w-full"
            >
              ساختن اسپیس جدید
              <span className="ms-1.5 font-black text-xl">
                <FiPlusSquare />
              </span>
            </button>
          </div>
          <div>
            {/* WorkSpaces */}
            {filteredWorkspace &&
              filteredWorkspace.map((workspace) => (
                <Workspace
                  workspace={workspace}
                  setDisplayModals={setDisplayModals}
                  key={workspace.id}
                />
              ))}
          </div>
        </div>
        <div className="mt-auto mb-l flex gap-s flex-col pe-12">
          <div className="flex flex-row-reverse items-center ">
            <span className="ms-xs text-2xl">
              <FaCircleUser />
            </span>
            <p className="text-body-m font-bold">امیر عبدالعظیمی</p>
          </div>
          <div className="flex flex-row-reverse items-center justify-between">
            <button className="flex items-center text-gray-primary flex-start flex-row-reverse">
              <span className="text-3xl ">
                <GiExitDoor />
              </span>
              <span className="mr-xs text-body-m">خروج</span>
            </button>
            <button
              className={`transition-all  delay-75 duration-500 w-16 flex rounded-lg p-1 items-center gap-xs ${
                toggleDarkMode
                  ? "bg-gray-darker "
                  : "bg-gray-secondary "
              }`}
              onClick={() => {
                setToggleDarkMode((prevState) => !prevState);
              }}
            >
              <span
                className={`p-1 transition-all duration-500 text-white flex items-center justify-center rounded bg-gray-primary text-lg ${
                  toggleDarkMode
                    ? "visible opacity-100"
                    : "invisible  opacity-0"
                }`}
              >
                <BsMoon />
              </span>
              <span
                className={`p-1 transition-all duration-500 text-black bg-white flex items-center justify-center rounded text-lg ${
                  toggleDarkMode
                    ? "invisible  opacity-0"
                    : "visible opacity-100"
                }`}
              >
                <BsSun />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiderBarMenu;
