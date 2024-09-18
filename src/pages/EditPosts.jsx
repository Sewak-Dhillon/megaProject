import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'

const EditPosts = () => {
    const [post,setPost] = useState([])
    const {slug} = useParams
    const navigate = useNavigate()

    useEffect(() =>{
        if(slug){
            appwriteService.getPost(slug).then(post => {
                if(post){
                    setPost(post)
                }else{
                    navigate('/')
                }
            })
        }
    },[slug,navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  )  : null
}

export default EditPosts