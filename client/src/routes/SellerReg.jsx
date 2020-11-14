import React from 'react';
const SellerReg = () => {
    const formGroup = {
        position: "relative",
        marginBottom: "1.3rem"
    }
    const formControl = {
        size: "40"
      }
    const formControlPlaceholder = {
        position: "absolute",
        top: "0",
        padding: "7px 0 0 13px",
        transition: "all 200ms",
        opacity: "0.5"
      }
    return (
        <div>
            <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div style={formGroup}>
                            <input type="text" id="sname" style={formControl} required size="40px"/>
                            <label style={formControlPlaceholder} for="sname">Shop-Name</label>
                        </div>
                        <div style={formGroup}>
                            <input type="text" id="shop-add" style={formControl} required/>
                            <label style={formControlPlaceholder} for="shop-add">Shop-address</label>
                        </div>
                        <div style={formGroup}>
                            <input type="text" id="district" style={formControl} required/>
                            <label style={formControlPlaceholder} for="district">District</label>
                        </div>
                        <div style={formGroup}>
                            <input type="text" id="pin-code" style={formControl} required/>
                            <label style={formControlPlaceholder} for="pin">pincode</label>
                        </div>
                        <div style={formGroup}>
                            <input type="email" id="email" style={formControl} required/>
                            <label style={formControlPlaceholder} for="email">Email-id</label>
                        </div>
                        <div style={formGroup}>
                            <input type="text" id="mobile-no." style={formControl} required/>
                            <label style={formControlPlaceholder} for="mobile-no">Mobile-no</label>
                        </div>
                        <div style={formGroup}>
                            <label for="exampleFormControlFile1">Address-proof(eg:Aadhar card)</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                            </div>
                        <div className="tax-details">
                            <h5>Do you have GST number?</h5>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" unchecked id="Yes"/>
                                <label className="form-check-label" for="exampleRadios1">
                                Yes
                                </label>
                            </div>
                        
                            <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" id="No"/>
                            <label className="form-check-label" for="exampleRadios2">No</label>
                            </div>
                            <br/>
                            <div style={formGroup}>
                            <input type="text" id="GSTIN" style={formControl} required placeholder="Provisional GSTIN"/>
                            </div>
                            <div style={formGroup}>
                            <input type="text" id="PAN" style={formControl} required placeholder="PAN Number"/>
                            </div>
                        </div>
                        <div style={formGroup}>
                            <input type="password" id="password" style={formControl} required/>
                            <label style={formControlPlaceholder} for="password">Password</label>
                        </div>
                        <div style={formGroup}>
                            <input type="password" id="confirm_password" className="form-control" required/>
                            <label style={formControlPlaceholder} for="confirm_password">Confirm Password</label>
                        </div>
                        <button type="button" className="btn btn-success" onclick="Nextpage()">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SellerReg;