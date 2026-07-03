"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {

    const router=useRouter();

    return(

        <div>

            <h2>Quick Actions</h2>

            <button
            className="bg-pink-500 p-4"
            onClick={()=>{
                router.push("/milk-entries/new")
            }}
            >
                Add Milk Entry
            </button>

            <br/><br/>

            <button
            className="bg-pink-500 p-4"
            onClick={()=>{
                router.push("/deductions/new")
            }}
            >
                Add Deduction
            </button>

            <br/><br/>

            <button
            className="bg-pink-500 p-4"
            onClick={()=>{
                router.push("/history")
            }}
            >
                History
            </button>

            <br/><br/>

            <button className="bg-pink-500 p-4">
                Reset Settlement
            </button>

        </div>

    )

}