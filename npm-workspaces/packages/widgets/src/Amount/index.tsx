import { Amount as AlfaAmount} from '@alfalab/core-components/amount';

function Amount() {
    return <AlfaAmount 
    value={123456700} 
    minority={100}  
    bold='none' 
    view='withZeroMinorPart'
/>
}

export default Amount;