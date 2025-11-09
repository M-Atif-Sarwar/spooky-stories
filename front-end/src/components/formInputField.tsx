"use client"
import { useState } from "react";
import { UseFormRegister,FieldValues, Path,FieldError } from "react-hook-form";

export type FormFieldProps<TFormValues extends FieldValues> = {
  type?: string;                     
  placeholder?: string;              
  name:Path<TFormValues>;           
  register: UseFormRegister<TFormValues>; 
  error?: FieldError;                     
  valueAsNumber?: boolean;
  label:string            
};


export function FormFields<TFormValues extends FieldValues> (
    {type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
    label
 }:FormFieldProps<TFormValues> ){
     const [hidePassword,sethidePassword]=useState(false)
     const isPasswordField = label === "Password" || label === "ConfirmPassword";

     return <>
   {/* //   retruning Password field if label is password */}
       { isPasswordField ?  <div className="flex flex-col gap-y-2">
        <label htmlFor={label}>{label} </label>
        <input
        type={hidePassword ? "text": type}
        placeholder={placeholder}
        {...register(name)}/>

        {error && <span className="text-red-800 text-xs"> {error.message}</span>}
        <button className='text-white border-8' type='button' onClick={(e)=>{
         sethidePassword(prev=>!prev)}
        }
         >showPaswwword</button>

     </div>
                   
         :
      <div className="flex flex-col gap-y-2">
        <label htmlFor={label}>{label} </label>
        <input
        type={type}
        placeholder={placeholder}
        {...register(name)}/>

        {error && <span className="text-red-800 text-xs">{error.message}</span>}

     </div>
       } 

      </>

 }




