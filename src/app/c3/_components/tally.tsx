// "use client";

// import { useEffect } from "react";
// import { CalPrefills } from "./cal";
// import { retrieveField } from "@/src/utils/tally";

// interface TallyC1Props {
//   id: string;
//   setPrefills: (props: CalPrefills) => void;
// }

// export const TallyC1 = ({ id, setPrefills }: TallyC1Props) => {
//   useEffect(() => {
//     const handleFormSubmit = (event: any) => {
//       try {
//         const data = JSON.parse(event.data);

//         if (data.event === "Tally.FormSubmitted") {
//           const who = retrieveField(data, "who");

//           const studentName = retrieveField(data, "student_name");
//           const studentEmail = retrieveField(data, "student_email");
//           const studentNumber = retrieveField(data, "student_number");

//           const parentName = retrieveField(data, "parent_name");
//           const parentEmail = retrieveField(data, "parent_email");
//           const parentNumber = retrieveField(data, "parent_number");

//           const name = (who === "Student" ? studentName : parentName) || "";
//           const smsReminderNumber =
//             (who === "Student" ? studentNumber : parentNumber) || "";

//           const email = (who === "Student" ? studentEmail : parentEmail) || "";
//           const guests = (who === "Student" ? parentEmail : studentEmail) || "";

//           setPrefills({ id, name, email, guests, smsReminderNumber });
//         }
//       } catch (error) {}
//     };
//     window.addEventListener("message", handleFormSubmit);
//     return () => window.removeEventListener("message", handleFormSubmit);
//   }, []);
//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100vw",
//         margin: 0,
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <iframe
//         src={`https://tally.so/r/3lyRbk?transparentBackground=1&id=${id}`}
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           right: 0,
//           bottom: 0,
//           left: 0,
//           border: "none",
//         }}
//         title="Accelerator Program Registration"
//       ></iframe>
//     </div>
//   );
// };
