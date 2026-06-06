"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {TriangleExclamation} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

const AllBtn = ({ job }) => {
  const router = useRouter();

  const DeleteHandler = async () => {
    const res = await fetch(
      `http://localhost:5000/add-job/${job._id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data) {
      toast.success("Deleted Successfully");
      router.refresh();
    } else {
      toast.error("Delete Failed");
    }
  };

  const EditHandler=async()=>{
    const res = await fetch(`http://localhost:5000/add-job/${job._id}`);
    const data = await res.json()
  }

  return (
    <div className="flex gap-2">
     

    <AlertDialog>
      <Button variant="danger">Delete Job</Button>
      <AlertDialog.Backdrop
        className="bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
        variant="blur"
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="items-center text-center">
              <AlertDialog.Icon status="danger">
                <TriangleExclamation className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Permanently delete  JOb?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This action cannot be undone. All your data, settings, and content will be
                permanently removed from our servers. The dramatic red backdrop emphasizes the
                severity and irreversibility of this decision.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex-col-reverse">
              <Button className="w-full" slot="close">
                Keep JOBS
              </Button>
              <Button onClick={DeleteHandler}
               className="w-full" slot="close" variant="danger">
                Delete 
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
    </div>
  );
};

export default AllBtn;