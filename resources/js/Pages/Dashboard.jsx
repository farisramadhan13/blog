import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotif] =useState(false);

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        Inertia.post('/article', data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(()=>{
        if(!props.myArticle){
            Inertia.get('/article')
        }
        return;
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b text-gray-200">
                        {isNotif && 
                        <div role="alert" className="alert alert-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Berita berhasil ditambahkan</span>
                        </div>
                        }
                        <input type="text" placeholder="Judul" className="input input-bordered m-2 w-full" onChange={(title)=>setTitle(title.target.value)} value={title}/>
                        <input type="text" placeholder="Deskripsi" className="input input-bordered m-2 w-full" onChange={(description)=>setDescription(description.target.value)} value={description}/>
                        <input type="text" placeholder="Kategori" className="input input-bordered m-2 w-full" onChange={(category)=>setCategory(category.target.value)} value={category}/>
                        <button className='btn btn-primary m-2' onClick={()=>handleSubmit()}>Submit</button>
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-4 p-4'>
                    {props.myArticle && props.myArticle.length>0 ? props.myArticle.map((article, i)=>{
                        return (
                            <div key={i} className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {article.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{article.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{article.category}</div> 
                                        <div className='badge badge outline'><Link href={route('edit.article')} method='get' data={{id: article.id}} as="button">edit</Link></div>
                                        <div className='badge badge outline'><Link href={route('delete.article')} method='post' data={{id: article.id}} as="button">delete</Link></div>
                                    </div>
                                </div>
                            </div>
                        )
                    }): <p>Belum ada artikel yang anda buat</p>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
