"use client";

import { useProjectForm } from "@/hooks/useProjectForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectFormModal() {
  const {
    open,
    setOpen,
    title,
    setTitle,
    description,
    setDescription,
    imageFile,
    setImageFile,
    imagePreviewUrl,
    onSubmit,
    isSubmitting,
    isValid,
  } = useProjectForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="mt-2 w-full h-auto"
            />
          )}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-4 w-full"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
