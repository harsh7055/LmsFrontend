import React,{Component} from "react";
import ScannerData from "./ScannerData";
class Scanner extends Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    render() {
        return (<div>
            <ScannerData 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={this.onNewScanResult}/>
        </div>);
    }

    onNewScanResult(decodedText, decodedResult) {
        alert("Scanned")
        console.log(decodedResult + '...............' + decodedText)
    }
};
export default Scanner
