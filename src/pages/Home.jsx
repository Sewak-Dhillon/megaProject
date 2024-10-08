import React,{useState,useEffect} from 'react'
import { Container,PostCard } from '../components'
import appwriteService from '../appwrite/config'

const Home = () => {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        appwriteService.getPosts().then((posts) => {
            if(posts)
            {
                setPosts(posts.documents)
            }
        })
    },[])
    
    if(posts.length === 0)
    {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else{
        return (
            <div className="w-full py-8 mt-4">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post, index) => (
                            <div key={index} className="p-2 w-full md:w-1/2 lg:w-1/3">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home