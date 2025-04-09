// import React, { useState, useRef, useEffect } from "react";
// import { IoMdClose } from "react-icons/io";
// import { MdAttachFile } from "react-icons/md";
// import { BsEmojiSmile } from "react-icons/bs";
// import { IoMdSend } from "react-icons/io";
// import { GoTrash } from "react-icons/go";
// import EmojiPicker from "emoji-picker-react";

// const SupportModal = ({ open, close }) => {
//   const [message, setMessage] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const emojiPickerRef = useRef(null);

//   const [data, setData] = useState([
//     { text: "Assalomalekum sizga qanday yordam bera olamiz?", author: "admin" },
//   ]);

//   const handleClose = () => {
//     close();
//     setSelectedImage(null);
//     setMessage("");
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         emojiPickerRef.current &&
//         !emojiPickerRef.current.contains(event.target)
//       ) {
//         setShowEmojiPicker(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleEmojiClick = (emojiObject) => {
//     setMessage((prev) => prev + emojiObject.emoji);
//   };

//   const handleSubmit = () => {
//     if (message || selectedImage) {
//       const newMessage = {
//         text: message || null,
//         image: selectedImage ? URL.createObjectURL(selectedImage) : null,
//         author: "me",
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setData((prevData) => [...prevData, newMessage]);
//       setMessage("");
//       setSelectedImage(null);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//       onClick={handleClose}
//     >
//       <div
//         className="bg-[#EAECF0] w-full max-w-lg rounded-2xl shadow-lg overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="h-[630px]">
//           <div className="relative z-10 bg-white h-[60px] flex items-center justify-center">
//             <p className="text-lg font-medium text-textColor">
//               Qo'llab quvvatlash xizmati
//             </p>
//             <button
//               className="absolute top-5 right-5 text-gray-400 hover:text-gray-500"
//               onClick={handleClose}
//             >
//               <IoMdClose size={24} />
//             </button>
//           </div>

//           <div className="relative h-[570px] pb-[90px] px-5">
//             <div className="h-full flex flex-col justify-end gap-3 overflow-y-auto">
//               {data.map((item, index) =>
//                 item.image ? (
//                   <div
//                     key={index}
//                     className={
//                       item.author === "admin"
//                         ? "flex justify-start"
//                         : "flex justify-end"
//                     }
//                   >
//                     <div
//                       className={`relative max-w-[200px] flex p-1 flex-col items-end rounded-xl ${
//                         item.author === "admin" ? "bg-white" : "bg-primary"
//                       }`}
//                     >
//                       {item.image && (
//                         <div className="w-full">
//                           <img
//                             src={item.image}
//                             alt="Sent"
//                             className="w-full h-full object-cover rounded-lg"
//                           />
//                         </div>
//                       )}
//                       {item.text && (
//                         <div className="px-2">
//                           <p
//                             className={`pb-5 text-base pt-1 ${
//                               item.author === "admin"
//                                 ? "text-black"
//                                 : "text-white"
//                             }`}
//                           >
//                             {item.text}
//                           </p>
//                         </div>
//                       )}
//                       <span
//                         className={`absolute text-xs bottom-1 right-1.5 ${
//                           item.author === "admin"
//                             ? "text-black/80"
//                             : "text-white/80"
//                         }`}
//                       >
//                         {item.timestamp}
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div
//                     key={index}
//                     className={
//                       item.author === "admin"
//                         ? "flex justify-start"
//                         : "flex justify-end"
//                     }
//                   >
//                     <div
//                       onContextMenu={(e) => {
//                         e.preventDefault();
//                         console.log("object");
//                       }}
//                       className={`relative max-w-[80%] pl-4 pr-5 py-1 rounded-xl ${
//                         item.author === "admin" ? "bg-white" : "bg-primary"
//                       }`}
//                     >
//                       {item.image && (
//                         <div className="w-28 h-28 mb-2">
//                           <img
//                             src={item.image}
//                             alt="Sent"
//                             className="w-full h-full object-cover rounded-lg"
//                           />
//                         </div>
//                       )}
//                       {item.text && (
//                         <p
//                           className={`pb-5 text-base ${
//                             item.author === "admin"
//                               ? "text-black"
//                               : "text-white"
//                           }`}
//                         >
//                           {item.text}
//                         </p>
//                       )}
//                       <span
//                         className={`absolute text-xs bottom-1 right-1.5 ${
//                           item.author === "admin"
//                             ? "text-black/80"
//                             : "text-white/80"
//                         }`}
//                       >
//                         {item.timestamp}
//                       </span>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>

//             <div className="absolute h-[50px] w-[92%] bg-white left-5 bottom-5 rounded-xl px-4 flex items-center justify-between gap-10">
//               <div className="flex items-center gap-3 w-full">
//                 {selectedImage ? (
//                   <div>
//                     <div className="flex items-center">
//                       <div className="relative rounded-md flex gap-2">
//                         <label
//                           htmlFor="file-upload"
//                           className="cursor-pointer min-w-10 max-w-10 max-h-10 min-h-10"
//                         >
//                           <img
//                             src={URL.createObjectURL(selectedImage)}
//                             alt="Selected"
//                             className="w-full h-full object-cover rounded-md"
//                           />
//                         </label>
//                         <input
//                           id="file-upload"
//                           type="file"
//                           accept="image/*"
//                           style={{ display: "none" }}
//                           onChange={(e) => setSelectedImage(e.target.files[0])}
//                         />
//                         <button onClick={() => setSelectedImage(null)}>
//                           <GoTrash size={20} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <label htmlFor="file-upload" className="cursor-pointer">
//                       <MdAttachFile
//                         color="#858E99"
//                         size={24}
//                         className="rotate-[35deg]"
//                       />
//                     </label>
//                     <input
//                       id="file-upload"
//                       type="file"
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       onChange={(e) => setSelectedImage(e.target.files[0])}
//                     />
//                   </>
//                 )}
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Message"
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && (message || selectedImage)) {
//                       handleSubmit();
//                     }
//                   }}
//                   className="w-full outline-none py-1 text-textColor"
//                 />
//               </div>

//               <div className="flex items-center min-w-[65px] relative justify-between">
//                 <>
//                   <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
//                     <BsEmojiSmile color="#707991" size={20} />
//                   </button>
//                   {showEmojiPicker && (
//                     <div
//                       ref={emojiPickerRef}
//                       className="absolute bottom-12 right-0 z-50"
//                     >
//                       <EmojiPicker
//                         onEmojiClick={handleEmojiClick}
//                         theme="light"
//                       />
//                     </div>
//                   )}
//                 </>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={!selectedImage && !message}
//                 >
//                   <IoMdSend
//                     size={26}
//                     className={
//                       selectedImage || message
//                         ? "text-primary cursor-pointer"
//                         : "text-primary opacity-50 cursor-not-allowed"
//                     }
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportModal;
