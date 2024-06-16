#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Class for bankAccount
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //withdrawl
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.greenBright.bold(`Withdrawal of $${amount} successfull. Remaining balance:  $${this.balance}`));
        }
        else {
            console.log(chalk.bgRedBright.bold(`Insufficient balance.`));
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(chalk.greenBright.bold(`Deposit of $${amount} is successful. Remaining balance: $${this.balance}`));
    }
    // check balance
    checkBalance() {
        console.log(chalk.magentaBright.bold(`Current bslsnce is $${this.balance}`));
    }
}
class Customer {
    firstName;
    lastName;
    gender;
    age;
    cellNumber;
    account;
    constructor(firstNAme, lastName, gender, age, cellNumber, account) {
        this.firstName = firstNAme;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.cellNumber = cellNumber;
        this.account = account;
    }
}
// creat bank account
const accounts = [
    new BankAccount(1000, 1000),
    new BankAccount(1001, 3000),
    new BankAccount(1002, 5000)
];
// creat customers
const customers = [
    new Customer('Shumaila', 'Aijaz', 'Female', 25, 3333111567, accounts[0]),
    new Customer('Fazila', 'Ali', 'Female', 27, 3333000685, accounts[1]),
    new Customer('Murtaza', 'Ali', 'Male', 10, 3323456712, accounts[2])
];
// function to  interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: 'number',
                message: 'Enter your account number :'
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log((`Welcome, ${customer.firstName} ${customer.lastName}`));
            const ans = await inquirer.prompt([
                {
                    name: 'select',
                    type: 'list',
                    message: 'Select an operation',
                    choices: ['Deposit', 'Withdraw', 'Check Balance', 'Exit']
                }
            ]);
            switch (ans.select) {
                case 'Deposit':
                    const depositAmount = await inquirer.prompt([
                        {
                            name: 'amount',
                            type: 'number',
                            message: 'Enter an amount for deposit'
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case 'Withdraw':
                    const withdrawAmount = await inquirer.prompt([
                        {
                            name: 'amount',
                            type: 'number',
                            message: 'Enter an amount for Withdraw'
                        }
                    ]);
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case 'Check Balance':
                    customer.account.checkBalance();
                    break;
                case 'Exit':
                    console.log(chalk.yellow.bold.italic(`Exiting`));
                    console.log(chalk.magentaBright.bold.italic(`Thanks for useing "OPP My Bank Account"`));
                    console.log(chalk.greenBright.bold.italic(`Have a nice day:-)`));
                    return;
            }
        }
        else {
            console.log(chalk.bgRedBright.bold(`Invalid input!! Please try again.`));
        }
    } while (true);
}
service();
