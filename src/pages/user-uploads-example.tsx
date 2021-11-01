import { Button, Flex, FormControl, VStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadedFile } from "src/utils/types";
import { uploadFile, linkToUploadedFile } from "src/utils/uploaded-files";

function ExamplePage() {
  const { handleSubmit, register } = useForm<{
    image: unknown;
  }>();

  const [images, setImages] = useState<UploadedFile[]>([]);

  const submitData = async ({ image }: { image: FileList }) => {
    const result = await uploadFile(image[0], {
      onProgress(percent) {
        console.log(percent);
      },
    });
    setImages([...images, result]);
  };
  return (
    <VStack>
      <form onSubmit={handleSubmit(submitData)}>
        <Flex>
          <FormControl>
            {/* eslint-disable-next-line react/forbid-elements */}
            <input type="file" accept="image/*" {...register("image")} />
          </FormControl>
        </Flex>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </form>
      <VStack>
        {images.map(({ blobPath, name }) => (
          <VStack key={name}>
            <Image
              src={linkToUploadedFile(blobPath)}
              width="100px"
              height="100px"
              unoptimized={true} // the edge network/optimized files will not work for uploaded files, since we need to pass cookies
            />
            <Text>{name}</Text>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
export default ExamplePage;
