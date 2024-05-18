const isArticle = (article) => {
    return article.map((data, i) => {
        return (
            <div key={i} className="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{data.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-inline">{data.category}</div> 
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </div>
        )
    })
}

const noArticle = () => {
    return(
        <div>
            <p>Saat ini belum ada data tersedia</p>
        </div>
    )
}


const ArticleList = ({article}) => {
    return !article ? noArticle() : isArticle(article)
}

export default ArticleList