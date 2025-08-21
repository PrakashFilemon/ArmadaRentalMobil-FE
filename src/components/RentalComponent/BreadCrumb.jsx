// import React from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { CheckCircle } from "lucide-react";

// const BreadCrumbRental = ({ currentStep = 1 }) => {
//   // Define all steps in the rental process
//   const steps = [
//     { id: 1, label: "Pesan" },
//     { id: 2, label: "Bayar" },
//     { id: 3, label: "Selesai" },
//   ];

//   return (
//     <div className="w-full py-6">
//       <Breadcrumb className="mx-auto max-w-3xl">
//         <BreadcrumbList className="flex justify-between w-full">
//           {steps.map((step, index) => (
//             <React.Fragment key={step.id}>
//               <BreadcrumbItem className="flex-1">
//                 <div className="flex flex-col items-center space-y-2">
//                   {/* Step number circle with different styling based on progress */}
//                   <div
//                     className={`
//                       w-10 h-10 rounded-full flex items-center justify-center
//                       ${
//                         currentStep > step.id
//                           ? "bg-green-600 text-white"
//                           : currentStep === step.id
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-200 text-gray-500"
//                       }
//                       transition-all duration-300
//                     `}
//                   >
//                     {currentStep > step.id ? (
//                       <CheckCircle className="h-6 w-6" />
//                     ) : (
//                       <span className="font-semibold">{step.id}</span>
//                     )}
//                   </div>

//                   {/* Step label */}
//                   <BreadcrumbPage
//                     className={`
//                       font-medium text-sm sm:text-base
//                       ${
//                         currentStep >= step.id
//                           ? "text-gray-900 font-semibold"
//                           : "text-gray-400"
//                       }
//                     `}
//                   >
//                     {step.label}
//                   </BreadcrumbPage>
//                 </div>
//               </BreadcrumbItem>

//               {/* Progress line between steps */}
//               {index < steps.length - 1 && (
//                 <div className="flex-1 flex items-center max-w-24">
//                   <div
//                     className={`
//                       h-1 w-full
//                       ${
//                         currentStep > index + 1 ? "bg-green-600" : "bg-gray-200"
//                       }
//                       transition-all duration-300
//                     `}
//                   ></div>
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </BreadcrumbList>
//       </Breadcrumb>

//       {/* Step description (optional) */}
//       <div className="text-center mt-4 text-sm text-gray-500">
//         {currentStep === 1 && "Isi informasi penyewaan"}
//         {currentStep === 2 && "Pilih metode pembayaran"}
//         {currentStep === 3 && "Pesanan berhasil"}
//       </div>
//     </div>
//   );
// };

// export default BreadCrumbRental;
