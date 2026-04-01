import Navbar from " .. /components/Navbar";
import { Plus, User, FileText } from "lucide-react";    
const ApplyLeave = () => {
const [form, setForm] = usestate({
category:"",
fromDate:"",
toDate:"",
leaveTime:"",
returnTime:"",
remark: "",
});

const handleChange = (e)=>{

    setForm({...form,[e.target.name]: e.target.value});

}   
const handleSubmit = (e) => {
e.preventDefault();
console.log(form); 
}

}

