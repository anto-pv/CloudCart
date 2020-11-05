import React from 'react';
const Slot = () => {
    return (
        <div>
            <h6>*Some slots cannot be chosen if number of people to be allowed has reached the limit </h6>
            <div class="container">	
                <h4>Choose your time slot</h4>
                <br/>
                <ul style="background-color: #e8ffff;">
                    <li>
                        <input type="radio" id="9-option" name="selector"/>
                        <label for="9-option">9:00AM - 10:00AM</label>
                        <div class="check"></div>
                    </li>
                    <li>
                        <input type="radio" id="10-option" name="selector" onclick="givealert()"/>
                        <label for="10-option">10:00AM - 11:00AM</label>
                        <div class="check">
                            <div class="inside"></div>
                        </div>
                    </li>
                    <li>
                        <input type="radio" id="11-option" name="selector"/>
                        <label for="11-option">11:00AM - 12:00PM</label>
                        <div class="check">
                            <div class="inside"></div>
                        </div>
                    </li>
                </ul>
                <button type="button" class="btn btn-success" onclick="Nextpage()" id="proceed">Proceed</button>
            </div>
        </div>
    );
};
export default Slot;