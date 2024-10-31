import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add a Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [showForm, setShowForm] = useState(false);
//   function handleCloseModal() {
//     setShowForm(false);
//   }
//   return (
//     <div>
//       <Button onClick={() => setShowForm(!showForm)}>Add a Cabin</Button>;
//       {showForm && (
//         <Modal closeModal={handleCloseModal}>
//           <CreateCabinForm closeModal={handleCloseModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
