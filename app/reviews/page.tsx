import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import SectionTitle from '@/components/global/SectionTitle'
import ReviewCard from '@/components/reviews/ReviewCard'
import { deleteReviewAction, fetchProductReviewsByUser } from '@/utils/action'


async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser()
  if(reviews.length===0){
    return <SectionTitle title="you have no reviews yet."/>
  }
    return (
    <>
      <SectionTitle title='your reviews'/>
      <section className='grid md:grid-cols-2 gap-8 mt-4'>
        {reviews.map((review,index)=>{
          const {rating, comment} = review
          const {name, image} = review.product
          const reviewInfo = {rating, comment, name, image}
          return <ReviewCard reviewInfo={reviewInfo} key={index}>
              <DeleteReview reviewId={review.id}/>
          </ReviewCard>
        })}
      </section>
    </>
  )
}

const DeleteReview = ({reviewId}:{reviewId:string})=>{
  const deleteReview = deleteReviewAction.bind(null, {reviewId})
  return <FormContainer action={deleteReview}>
    <IconButton actionType="delete"/>
  </FormContainer>
}

export default ReviewsPage