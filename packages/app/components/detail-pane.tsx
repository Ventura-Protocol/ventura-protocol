import DefaultErrorPage from 'next/error';
import { useRouter } from 'next/router'

const DetailPane = () => {
    const router = useRouter()
    console.log(router.query);
    return(
        <DefaultErrorPage statusCode={404} />
    )
}

export default DetailPane;