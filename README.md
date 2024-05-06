<div align="center">
  <img src="https://i.imgur.com/6IpIo7H.png" />
</div>

# HaimaLab

Welcome to the HaimaLab project! This system aims to streamline and manage the operations of a medical hematology lab, providing various functionalities for different types of users. The system includes login capabilities, a dashboard for quick access to relevant information, and specific sections for patients, doctors, nurses, devices, and administrators.

## About

HaimaLab is designed to improve the efficiency and effectiveness of hematology lab operations. It allows authorized users to access and manage relevant data within the system, ensuring smooth workflows and accurate record keeping. This README file provides an overview of the system and its functionalities, installation instructions, and additional resources.

## Demo

Our web app is deployed to Vercel, you can try it with different roles and authorization levels on [haimalab.vercel.app](https://haimalab.vercel.app/).
Note: Data mutatuins (Creating, updating, deleting) are disabled in this demo version.

https://github.com/Bodykudo/HaimaLab/assets/83988379/633b7058-b603-41b1-928f-5edff3b39792

## Functionalities

HaimaLab offers the following functionalities:

1. _Login_: Users can securely log in to their respective accounts using their credentials.
   | User Login | Change Authorization level |
   | :----------------------------: |:----------------------------: |
   | ![](Demo/login.png) | ![](Demo/login2.png) |

2. _Dashboard_: A central hub providing an overview of key information and quick access to different sections.
   | Dashboard | Dark Mode |
   | :----------------------------: |:----------------------------: |
   | ![](Demo/dashboard.png) | ![](Demo/dark-mode.png) |

3. _Patients Section_: Admins can view and manage patient records, including personal details, medical history, and test results.
   | Patients | Add New Patient |
   | :----------------------------: |:----------------------------: |
   | ![](Demo/patients.png) | ![](Demo/add-new-patient.png) |

4. _Doctors Section_: Admins can add, edit, and delete doctor profiles, including their specialization and contact information.
   | Doctors | Add New Doctor |
   | :----------------------------: |:----------------------------: |
   | ![](Demo/doctors.png) | ![](Demo/add-new-doctor.png) |
5. _Nurses Section_: Admins can add, edit, and delete nurse profiles, including their assigned shifts and contact information.
   | Nurses | Add New Nurse |
   | :----------------------------: | :----------------------------: |
   | ![](Demo/nurses.png) | ![](Demo/add-new-nurse.png) |
6. _Devices Section_: Admins can view and manage the devices used in the medical lab, including maintenance schedules and availability.
   | Devices | Devies Extended |
   | :----------------------------: | :----------------------------: |
   | ![](Demo/devices.png) | ![](Demo/devices2.png) |

   |        Add New Device        |        Edit Device        |
   | :--------------------------: | :-----------------------: |
   | ![](Demo/add-new-device.png) | ![](Demo/edit-device.png) |

7. _Admins Section_: Only accessible to admin accounts, this section allows admins to view information about other user accounts without the ability to delete any user.
   | View Patient/Doctor/Nurse Profile | Edit Patient/Doctor/Nurse Profile |
   | :----------------------------: | :----------------------------: |
   | ![](Demo/view-admin.png) | ![](Demo/view-admin-edit.png) |

8. _Profile Section_: Any Admin/Patient/Doctor/Nurse can edit his profile, including their Name, Birthdate, Mobile and avatar.

   |        Profile         |    Profile Extended    | Edit Profile               |
   | :--------------------: | :--------------------: | -------------------------- |
   | ![](Demo/profile1.png) | ![](Demo/profile2.png) | ![](Demo/edit-profile.png) |

## Installation

To install and run the HaimaLab locally, follow these steps:

1. Clone the project repository.
2. Navigate to the project directory.
3. Install the necessary dependencies by running the following command:

```
npm install
```

4. Run the project by running the following command:

```
npm run dev
```

5. Access the system by visintg http://127.0.0.1:5173

## Technology Stack

Built using React, React Query, Supabase and Styled Components

<p align="left"> <a href="https://html.spec.whatwg.org/multipage/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
  <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
    <a href="https://supabase.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" alt="git" width="40" height="40"/> </a>
  <a href="https://platform.openai.com/docs/api-reference" target="_blank" rel="noreferrer"> <img src="https://github.com/gilbarbara/logos/blob/main/logos/openai-icon.svg" alt="git" width="40" height="40"/> </a>
  <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
</p>

We would like to acknowledge the following individuals for their contributions to the HaimaLab project:

<table>
  <tr>
    <td align="center">
    <a href="https://github.com/Bodykudo" target="_black">
    <img src="https://avatars.githubusercontent.com/u/17731926?v=4" width="150px;" alt="Abdallah Magdy"/>
    <br />
    <sub><b>Abdallah Magdy</b></sub></a>
    <td align="center">
    <a href="https://github.com/abduelrahmanemad" target="_black">
    <img src="https://avatars.githubusercontent.com/u/104274128?v=4" width="150px;" alt="Abdelrahman Emad"/>
    <br />
    <sub><b>Abdelrahman Emad</b></sub></a>
    </td>
    </td>
    <td align="center">
    <a href="https://github.com/MohamedAlaaAli" target="_black">
    <img src="https://avatars.githubusercontent.com/u/94873742?v=4" width="150px;" alt="Mohamed Alaa"/>
    <br />
    <sub><b>Mohamed Alaa</b></sub></a>
    </td>
    <td align="center">
    <a href="https://github.com/OmarAtef0" target="_black">
    <img src="https://avatars.githubusercontent.com/u/131784941?v=4" width="150px;" alt="Omar Atef"/>
    <br />
    <sub><b>Omar Atef</b></sub></a>
    </td>
   <td align="">
    <a href="https://github.com/ossama971" target="_black">
    <img src="https://avatars.githubusercontent.com/u/40814982?v=4" width="150px;" alt="Osama Mohamed Badawi"/>
    <br />
    <sub><b>Osama Mohamed Badawi</b></sub></a>
    </td>
    <td align="center">
    <a href="https://github.com/Youssef-Ashraf71" target="_black">
    <img src="https://avatars.githubusercontent.com/u/83988379?v=4" width="150px;" alt="Youssef Ashraf"/>
    <br />
    <sub><b>Youssef Ashraf</b></sub></a>
    </td>
      </tr>
 </table>
