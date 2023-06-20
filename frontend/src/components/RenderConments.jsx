import React from 'react'
import {Conment} from '.'


const RenderConments = ({data, title, setAffectedConment, affectedConment, postId, setConments}) => {
    if (data?.length > 0) {
        return data.map(post => <Conment key={post._id} {...post} name={post.postedBy.user} date={post.createdAt} text={post.text} avatar={post.postedBy.avatar} userId={post.postedBy._id} setAffectedConment={setAffectedConment} affectedConment={affectedConment} postId={postId} setConments={setConments} />)
    }

    return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
            {title}
        </h2>
    )
}

export default RenderConments