import GameDetails from "../gamedetails";


export default async function GameDec({ params }: { params: { id: string } }) {

    const id = parseInt(params.id, 10);

    return (
        <>
            <GameDetails gameId={id} />
        </>
    )
}