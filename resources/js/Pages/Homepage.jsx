import ArticleList from '@/Components/Homepage/ArticleList';
import Paginator from '@/Components/Homepage/Paginator';
import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';

export default function Homepage(props) {
    console.log('homepage', props)
    return (
        <div className='min-h-screen bg-slate-200 text-black'>
            <Head title={props.title}/>
            <Navbar user={props.auth.user}/>
            <div className='flex justify-center items-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch gap-4 p-4'>
                <ArticleList article={props.article.data}/>
                {/* {props.article ? props.article.map((data, i) => {
                    return(
                        <div className='m-5 bg-white p-5 shadow-md rounded-xl' key={i}>
                            <p>{data.title}</p>
                            <p>{data.description}</p>
                            <p>{data.author}</p>
                            <p>{data.category}</p>
                        </div>
                    )
                }) : <p>Belum ada data tersedia</p>} */}
                {/* <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                        Shoes!
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div> 
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className='flex justify-center items-center'>
                <Paginator meta={props.article.meta}/>
            </div>
        </div>
    )
}