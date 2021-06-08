const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Withdraw'];

    return (
      <div className = 'type' >
        <h3 classname  = 'choice'>{choice [Number(!isDeposit)]}</h3> 
        <input className = 'amount' type="number" onChange={onChange}></input>
        <input className = 'execute' type="submit" disabled={!isValid}></input>
      </div>
    );
};
  
const Account = () => {
    const [accountState, setAccountState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [deposit, setDeposit] = React.useState(0);
    const [mode, setMode] = React.useState('');
    const [valid, setValid] = React.useState(false);

    const handleChange = event => {
      if (event.target.value <= 0) {
        return setValid(false);
      };

      if (mode == 'Withdraw' && Number(event.target.value) > accountState){
        setValid(false);
      } else {
        setValid(true);
      };

      console.log(`handleChange ${event.target.value}`);
      setDeposit(Number(event.target.value));
    };

    const handleSubmit = event => {
      event.preventDefault();
      let newTotal = isDeposit ? accountState + deposit : accountState - deposit;
      console.log(`Account total = ${newTotal}`);
      setAccountState(newTotal);
      setValid(false);
    };

    const handleModeSelect = (event) => {
      setMode(event.target.value);

      if(event.target.value == 'Deposit') {
        setValid(true);
        setIsDeposit(true);
      } else {
        setIsDeposit(false);
      };
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 className = 'account'>Account Balance: ${accountState}</h2>
        <div className = 'banner'>
          <img src='images/money.jpg'/>
        </div>
        <div className = 'selector'>
        <label className = 'label'>Select an Action</label>
          <select onChange={(event) => handleModeSelect(event)} className = 'menu'>
            <option id="none" value=""></option>
            <option id="deposit" value="Deposit">Deposit</option>
            <option id="withdraw" value="Withdraw">Withdraw</option>
          </select>
        </div>
        {
         mode && 
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={valid}> 
        Deposit</ATMDeposit>
        } 
      </form>
    );
};

ReactDOM.render(<Account />, document.getElementById("root"));