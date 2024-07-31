// Librairies
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

// components
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const NotConnected = () => {
  return (
    <Alert variant='destructive'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <AlertTitle>Attention</AlertTitle>
      <AlertDescription>
        Veuillez connecter votre wallet à la dApp.
      </AlertDescription>
    </Alert>
  );
};

export default NotConnected;
