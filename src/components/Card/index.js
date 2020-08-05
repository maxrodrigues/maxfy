import React, { useRef, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Container, Label } from './styles'

import BoardContext from '../Board/context'

export default function Card ({data, index, listIndex}){

    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [{isDragging}, dragRef] = useDrag({
        item: { type: 'CARD', index, listIndex },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedListIndex = item.listIndex
            const targetListIndex = listIndex;
            //card que é arrastado
            const draggedIndex = item.index;
            //card alvo
            const targetIndex = index;
            //tamanho do elemento (card alvo)
            const targetSize = ref.current.getBoundingClientRect();
            //calculo da metade do elemento (card alvo)
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;
            //distancia do que o item esta do topo, quanto mais arrastar para baixo, maior o valor e vice-versa
            const draggedOffset = monitor.getClientOffset();
            //calculo se o elemento passou da metade do card alvo
            const draggedTop = draggedOffset.y - targetSize.top;

            //caso o item seja arrastado seja arrastado na mesma posição não faz nada
            if(draggedIndex === targetIndex && draggedListIndex === targetListIndex){
                return;
            }

            //Se posição do elemento for menor que a posição do alvo 
            // e ele não tiver passado da metade do elemento alvo
            if(draggedIndex < targetIndex && draggedTop < targetCenter){
                return;
            }

            //Se posição do elemento for maior que a posição do alvo 
            // e ele não tiver passado da metade do elemento alvo
            if(draggedIndex > targetIndex && draggedTop > targetCenter){
                return;
            }

            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex)
            item.index = targetIndex;
            item.listIndex = targetListIndex;
            //console.log('teste');
        }
    })

    dragRef(dropRef(ref));

    return (
        <Container ref={ref} isDragging={isDragging}>
            <header>
                {data.labels.map(label => <Label key={label} color={label}/>)}
            </header>
            <p>{data.content}</p>
            {data.user && (<img src={data.user} alt="" />)}
            
        </Container>
    )
}