import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function EditArticle(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        const data = {
            id: props.myArticle.id, title, description, category
        }
        Inertia.post('/article/update', data)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    return (
        <div className='min-h-screen bg-slate-200 text-black'>
            <Head title={props.title}/>
            <Navbar user={props.auth.user}/>
                <h1>Edit Berita</h1>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <input type="text" placeholder="Judul" className="input input-bordered m-2 w-full" onChange={(title)=>setTitle(title.target.value)} defaultValue={props.myArticle.title}/>
                        <input type="text" placeholder="Deskripsi" className="input input-bordered m-2 w-full" onChange={(description)=>setDescription(description.target.value)} defaultValue={props.myArticle.description}/>
                        <input type="text" placeholder="Kategori" className="input input-bordered m-2 w-full" onChange={(category)=>setCategory(category.target.value)} defaultValue={props.myArticle.category}/>
                        <button className='btn btn-primary m-2' onClick={()=>handleSubmit()}>Update</button>
                    </div>
                </div>
        </div>
    )
}