import React from "react";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as PiIcons from "react-icons/pi";

const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Students",
    path: "",
    icon: <PiIcons.PiStudentBold />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Students Record",
        path: "/student",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Internship",
        path: "/internship",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Job Opportunities",
        path: "/job",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Higher Studies",
        path: "/higherstudies",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Faculty",
    path: "/faculty",
    icon: <GiIcons.GiTeacher />,
  },
  {
    title: "Research Papers",
    path: "/research",
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: "Workshops",
    path: "",
    icon: <BsIcons.BsPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Register Workshop",
        path: "/workshop",
        icon: <BsIcons.BsPeople />,
      },
      {
        title: "View Workshops",
        path: "/viewWorkshop",
        icon: <BsIcons.BsPeople />,
      },
      {
        title: "People Registered",
        path: "/workshopRegistrations",
        icon: <BsIcons.BsPeople />,
      },
    ],
  },
  {
    title: "Activity",
    path: "",
    icon: <BsIcons.BsPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Upload Activites",
        path: "/activity",
        icon: <BsIcons.BsPeople />,
      },
      {
        title: "Show Activities",
        path: "/showactivity",
        icon: <BsIcons.BsPeople />,
      },
    ],
  },
];

export { SidebarData };
