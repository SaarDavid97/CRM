import {getFunctions, httpsCallable} from 'firebase/functions'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {useState} from 'react'

export default function DetectLogo({autoFill}) {

    const functions = getFunctions()
    const detectLogo = httpsCallable(functions, 'detectLogo')
    const [logo, setLogo] = useState('')
    const [detectedCompany, setDetectedCompany] = useState('')

    // belongs in the backend
    function getLogo(event) {
        event.preventDefault()

        const file = event.target.elements.logo.files[0]
        const storage = getStorage()
        const storageRef = ref(storage, 'logos/' + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', () => {}, (error) => {
            console.log('Error uploading file:', error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('Uploaded')
                detectLogo({image: downloadURL})
                    .then((result) => {
                        // read result and set the logo and name states in case the user will click autofill
                        console.log(result.data)
                        setLogo(downloadURL)
                        setDetectedCompany(result.data.companyName)
                    })
            })
        })
    }


    const handleAutoFill = (e) => {
        e.preventDefault()
        console.log(logo)
        autoFill({
            logo: logo,
            name: detectedCompany
        })
    }

    return (
        <form onSubmit={getLogo} className='detect-logo-form'>
            <h1>Detect logo</h1>
            {!logo &&  <label htmlFor='logo-img'>Upload logo</label>}
            {logo && <img className='detect-logo-logo' src={logo}/>}
            <input
                id='logo'
                name='logo'
                type='file'
                accept='image/*'
            />
            <input type='submit'/>
            {detectedCompany &&
                <div>
                    <p>Detected company: {detectedCompany}</p>
                    <button className='auto-fill' onClick={handleAutoFill}>
                        Auto fill
                    </button>
                </div>}
        </form>
    )
}