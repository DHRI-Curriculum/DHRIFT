import UseWorkshopsCard from './Hooks/UseWorkshopsCard';
import useAllWorkshops from './Hooks/UseAllWorkshops';


export default function WorkshopsView({ gitUser, gitRepo, instUser, instRepo }) {

    const workshops = useAllWorkshops({ gitUser, gitRepo, instUser, instRepo });

    return (
        <div className='workshop-grid'>
            {workshops.toLoop.map(v => {
                if (workshops.workshops[v] && workshops.workshops[v].type != 'dir' && workshops.workshops[v].name != 'README.md') {
                    return (
                        <>
                            {
                                <UseWorkshopsCard workshop={workshops.workshops[v]} gitUser={gitUser}
                                    gitRepo={gitRepo} instRepo={instRepo} instUser={instUser}
                                     key={v}
                                />
                            }
                        </>
                    )
                }
            }
            )}
        </div>
    )
}