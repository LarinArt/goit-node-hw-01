const contactOperations = require("./contacts.js");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactOperations.getContactsList();
      console.table(contactsList);
      break;
    case "get":
      const contact = await contactOperations.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const newContact = await contactOperations.addContact(name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const removedContact = await contactOperations.removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
