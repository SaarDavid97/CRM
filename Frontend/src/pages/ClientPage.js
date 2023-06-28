import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {storage} from '../firebase'
import DetectLogo from '../components/DetectLogo'
import {getItem, saveItem, updateItem} from '../dbFunctions'

export default function ClientPage() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        // default blank avatar if no image is uploaded
        logo: 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
    })


    // load client's details so we can display them if we're editing
    useEffect(() => {
        async function getClient() {
            // if id is null then we are adding a client, we're editing one if it's not
            if (id) {
                const client = await getItem(id, 'clients')
                setFormData(client)
            }
        }
        getClient()
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        id ? await updateItem(id, formData, 'clients') : await saveItem(formData, 'clients')
        navigate('/clients')
    }


    async function handleChange(e) {
        if (e.target.name === 'logo') {
            // the logos we save are urls, upload image and generate a url to save
            const file = e.target.files[0]
            const storageRef = ref(storage, 'logos/' + file.name)
            const uploadTask = uploadBytesResumable(storageRef, file)


            uploadTask.on('state_changed',
                (snapshot) => {},
                (error) => {
                    console.error('Error uploading file: ', error)
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                    setFormData((prevState) => ({
                        ...prevState,
                        logo: downloadURL,
                    }))
                }
            )


        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
    }

    return (
        <div className='add-client'>
            <div className='form-container'>
                <h1>{id ? 'Edit client' : 'Add client'}</h1>
                <form onSubmit={handleSubmit} className='client-form'>
                    <label htmlFor='logo'>Logo</label>
                    <img className='client-form-logo' src={formData.logo}/>
                    <input
                        id='logo'
                        name='logo'
                        type='file'
                        accept='image/*'
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        onChange={handleChange}
                        required={true}
                        value={formData.name}
                    />
                    <input type='submit'/>
                </form>
            </div>
            {!id && <DetectLogo autoFill={setFormData}/>}
        </div>
    )
}
