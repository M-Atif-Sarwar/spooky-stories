"use client"
import { useState } from "react";
import { UseFormRegister,FieldValues, Path,FieldError } from "react-hook-form";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
export type FormFieldProps<TFormValues extends FieldValues> = {
  type?: string;                     
  placeholder?: string;              
  name:Path<TFormValues>;           
  register: UseFormRegister<TFormValues>; 
  error?: FieldError;                     
  label:string            
};


export function FormFields<TFormValues extends FieldValues> (
    {type,
    placeholder,
    name,
    register,
    error,
    label
 }:FormFieldProps<TFormValues> ){
     const [hidePassword,sethidePassword]=useState(false)
     const isPasswordField = label === "Password" || label === "ConfirmPassword";

     return <>
   {/* //   retruning Password field if label is password */}
       { isPasswordField ?  <div className="flex flex-col gap-y-2 relative mb-1.5">
        <label htmlFor={label}>{label} </label>
        <input
        type={hidePassword ? "text": type}
        placeholder={placeholder}
        className="w-60 rounded-md p-2 border border-gray-500/20 placeholder:text-sm"
        {...register(name)}/>
      
        {error && <span className="text-red-800 text-xs"> {error.message}</span>}
        <button 
        className={'text-md  w-fit absolute bottom-[15px] left-[220px] top-9 {i} ${hidPassword ? "hover:"show passsword"}'} type='button' 
        onClick={(e)=>{sethidePassword(prev=>!prev)}}
        
         >{hidePassword ? <IoIosEye /> :  <IoIosEyeOff />}</button>

     </div>
                   
         :
      <div className="flex flex-col gap-y-2 mb-1.5">
        <label htmlFor={label}>{label} </label>
        <input
        type={type}
        className="w-60 rounded-md p-2 border border-gray-500/20 placeholder:text-sm"
        placeholder={placeholder}
        {...register(name)}/>

        {error && <span className="text-red-800 text-xs">{error.message}</span>}

     </div>
       } 

      </>

 }




