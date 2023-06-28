import LogoDisplay from './LogoDisplay';

export default function PredictionCard({prediction}) {

    return (
        <div className='task-card'>
            <LogoDisplay logo={prediction.logo}/>
            <p>{prediction.client}</p>
            <p>{prediction.num_of_tasks}</p>
        </div>
    )
}