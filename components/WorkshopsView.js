import WorkshopCard from './WorkshopCard';
import useAllWorkshops from './Hooks/UseAllWorkshops';

export default function WorkshopsView({ gitUser, gitRepo, instUser, instRepo }) {
    const workshops = useAllWorkshops({ gitUser, gitRepo, instUser, instRepo });

    return (
        <div className="workshop-grid">
            {workshops.toLoop.map((v) => {
                const workshop = workshops.workshops[v];
                if (workshop && workshop.type !== 'dir' && workshop.name !== 'README.md') {
                    return (
                        <WorkshopCard
                            key={v}
                            workshop={workshop}
                            gitUser={gitUser}
                            gitRepo={gitRepo}
                            instRepo={instRepo}
                            instUser={instUser}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
}