import {
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  Select,
  Button,
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
} from "@chakra-ui/react";
import { Types } from "mongoose";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import {
  getUserProfile,
  getChapterUsers,
  updateUserProfile,
} from "src/actions/User";
import { states, countries } from "src/utils/constants";
import { showError, showInfo } from "src/utils/notifications";
import {
  UserUpdate,
  ChapterUpdate,
  MaintenanceType,
  Chapter,
  User,
} from "src/utils/types";
import {
  maxInput,
  phoneNumberPattern,
  zipCodePattern,
} from "src/utils/validation";

interface FormData {
  name: string;
  phoneNumber: string;
  chapterName: string;
  contact: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  website: string;
  facebook: string;
  instagram: string;
  maintenanceTypes: string[];
  maintenancePeriod: number;
}

interface Contact {
  id: string;
  name: string;
  email: string;
}

function ChapterProfilePage() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [contactList, setContactList] = useState<Contact[]>([]);

  useEffect(() => {
    async function preloadFields() {
      const user = await getUserProfile();
      const chapter = user.chapter as Chapter;

      const contacts: User[] = await getChapterUsers();
      setContactList(
        contacts.map((user) => {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        })
      );

      reset({
        name: user.name,
        phoneNumber: user.phoneNum ?? "",
        chapterName: chapter.name,
        contact: chapter.contact.toString(),
        street: chapter.address.street,
        city: chapter.address.city,
        state: chapter.address.state,
        zipCode: chapter.address.zipCode,
        country: chapter.address.country,
        website: chapter.website ?? "",
        facebook: chapter.facebook ?? "",
        instagram: chapter.instagram ?? "",
        maintenanceTypes: chapter.maintenanceTypes,
        maintenancePeriod: chapter.maintenancePeriod,
      });
    }

    preloadFields().catch((error: Error) => {
      showError(error.message);
    });
  }, [reset]);

  const submitData = async (values: FormData) => {
    const userUpdate: UserUpdate = {
      name: values.name,
      phoneNum: values.phoneNumber,
    };

    const chapterUpdate: ChapterUpdate = {
      name: values.chapterName,
      contact: Types.ObjectId(values.contact),
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
      },
      website: values.website,
      facebook: values.facebook,
      instagram: values.instagram,
      maintenanceTypes: values.maintenanceTypes as Array<MaintenanceType>,
      maintenancePeriod: values.maintenancePeriod,
    };

    try {
      await updateUserProfile(userUpdate, chapterUpdate);
      showInfo("Successfully updated profile.");
    } catch (e) {
      const error = e as Error;
      showError(error.message);
    }
  };

  return (
    <Flex height="100%" width="100%">
      <Flex margin="auto">
        <VStack marginY={50}>
          <Text
            alignSelf="flex-start"
            pl={4}
            fontSize="xx-large"
            fontWeight={700}
          >
            Profile
          </Text>
          <form onSubmit={handleSubmit(submitData)}>
            <VStack
              minW={{ base: 425, md: 800 }}
              p={12}
              border="1px solid #657788"
              borderRadius={10}
              direction="column"
              backgroundColor="surface"
              spacing={10}
              align="stretch"
            >
              <Avatar alignSelf="center" width="80px" height="80px" />
              <VStack align="start" spacing={5}>
                <Text alignSelf="flex-start" fontSize="lg" fontWeight={700}>
                  User Information
                </Text>
                <Flex direction={{ base: "column", md: "row" }}>
                  <VStack
                    direction="column"
                    spacing={5}
                    mr={{ base: 0, md: 5 }}
                    mb={{ base: 5, md: 0 }}
                  >
                    <FormControl isInvalid={Boolean(errors.name)}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        id="name"
                        width={320}
                        maxLength={maxInput}
                        {...register("name", {
                          required: "Please enter a name.",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
                  <FormControl isInvalid={Boolean(errors.phoneNumber)}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      id="phoneNumber"
                      placeholder="XXX-XXX-XXXX"
                      width={320}
                      {...register("phoneNumber", {
                        required: "Please enter a phone number.",
                        pattern: {
                          value: phoneNumberPattern,
                          message: "Please format phone number correctly.",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.phoneNumber && errors.phoneNumber.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </VStack>
              <VStack align="start" spacing={5}>
                <Text alignSelf="flex-start" fontSize="lg" fontWeight={700}>
                  Chapter Information
                </Text>
                <Flex direction={{ base: "column", md: "row" }}>
                  <VStack
                    direction="column"
                    spacing={5}
                    mr={{ base: 0, md: 5 }}
                    mb={{ base: 5, md: 0 }}
                  >
                    <FormControl isInvalid={Boolean(errors.chapterName)}>
                      <FormLabel>Chapter Name</FormLabel>
                      <Input
                        id="nonprofitName"
                        width={320}
                        maxLength={maxInput}
                        {...register("chapterName", {
                          required: "Please enter a chapter name.",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.chapterName && errors.chapterName.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.contact)}>
                      <FormLabel>Contact</FormLabel>
                      <Select
                        id="contact"
                        width={320}
                        placeholder="Contact"
                        {...register("contact", {
                          required: "Please select a contact.",
                          onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                            e.target.value,
                        })}
                      >
                        {contactList.map(({ id, name, email }) => (
                          <option key={id} value={id}>
                            {`${name} (${email})`}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {errors.contact && errors.contact.message}
                      </FormErrorMessage>
                    </FormControl>
                    <VStack spacing={3}>
                      <FormControl isInvalid={Boolean(errors.street)}>
                        <FormLabel>Address</FormLabel>
                        <Input
                          id="street"
                          width={320}
                          maxLength={maxInput}
                          placeholder="Street"
                          {...register("street", {
                            required: "Please enter a street.",
                          })}
                        />
                      </FormControl>
                      <FormControl isInvalid={Boolean(errors.city)}>
                        <Input
                          id="city"
                          width={320}
                          maxLength={maxInput}
                          placeholder="City"
                          {...register("city", {
                            required: "Please enter a city.",
                          })}
                        />
                      </FormControl>
                      <HStack>
                        <FormControl isInvalid={Boolean(errors.state)}>
                          <Select
                            id="state"
                            width={190}
                            placeholder="State"
                            {...register("state", {
                              required: "Please enter a state.",
                            })}
                          >
                            {states.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl isInvalid={Boolean(errors.zipCode)}>
                          <Input
                            id="zipCode"
                            width={120}
                            placeholder="Zip code"
                            {...register("zipCode", {
                              required: "Please enter a zip code.",
                              pattern: {
                                value: zipCodePattern,
                                message: "Please provide a valid zip code.",
                              },
                            })}
                          />
                        </FormControl>
                      </HStack>
                      <FormControl isInvalid={Boolean(errors.country)}>
                        <Select
                          id="country"
                          width={320}
                          placeholder="Country"
                          {...register("country", {
                            required: "Please enter a country.",
                          })}
                        >
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {(errors.street && errors.street.message) ||
                            (errors.city && errors.city.message) ||
                            (errors.state && errors.state.message) ||
                            (errors.zipCode && errors.zipCode.message) ||
                            (errors.country && errors.country.message)}
                        </FormErrorMessage>
                      </FormControl>
                    </VStack>
                  </VStack>
                  <VStack spacing={5}>
                    <FormControl isInvalid={Boolean(errors.website)}>
                      <FormLabel>Website URL (Optional)</FormLabel>
                      <Input
                        id="website"
                        width={320}
                        maxLength={maxInput}
                        {...register("website")}
                      />
                      <FormErrorMessage>
                        {errors.website && errors.website.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.facebook)}>
                      <FormLabel>Facebook Username</FormLabel>
                      <Input
                        id="facebook"
                        width={320}
                        maxLength={maxInput}
                        {...register("facebook")}
                      />
                      <FormErrorMessage>
                        {errors.facebook && errors.facebook.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={Boolean(errors.instagram)}>
                      <FormLabel>Instagram Username</FormLabel>
                      <Input
                        id="instagram"
                        width={320}
                        maxLength={maxInput}
                        {...register("instagram")}
                      />
                      <FormErrorMessage>
                        {errors.instagram && errors.instagram.message}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
                </Flex>
              </VStack>
              <VStack align="start" spacing={5}>
                <Box>
                  <Text alignSelf="flex-start" fontSize="lg" fontWeight={700}>
                    Maintenance
                  </Text>
                  <Text
                    alignSelf="flex-start"
                    fontSize="sm"
                    fontWeight={400}
                    color="secondaryText"
                  >
                    Please specify a maintenance period and the kind of
                    maintenance your chapter is willing to support.
                  </Text>
                </Box>
                <FormControl isInvalid={Boolean(errors.maintenancePeriod)}>
                  <FormLabel>
                    <HStack>
                      <Text>Time Period</Text>
                      <Tooltip
                        label="Number of days to support project after completion."
                        placement="right"
                      >
                        <Box>
                          <BsInfoCircle />
                        </Box>
                      </Tooltip>
                    </HStack>
                  </FormLabel>
                  <Controller
                    control={control}
                    name="maintenancePeriod"
                    rules={{ required: "Please enter a maintenance period." }}
                    render={({ field: { ref, onChange, ...restField } }) => (
                      <NumberInput
                        {...restField}
                        max={365}
                        min={0}
                        w={36}
                        onChange={(value) =>
                          onChange(value ? parseInt(value) : 0)
                        }
                      >
                        <NumberInputField ref={ref} name={restField.name} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.maintenancePeriod &&
                      errors.maintenancePeriod.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.maintenanceTypes)}>
                  <FormLabel>Request Types</FormLabel>
                  <Controller
                    control={control}
                    name="maintenanceTypes"
                    render={({ field: { onChange, ...restFields } }) => (
                      <CheckboxGroup onChange={onChange} {...restFields}>
                        <HStack align="start" spacing={6}>
                          <Checkbox size="md" value="Bug Fixes">
                            Bug Fixes
                          </Checkbox>
                          <Checkbox size="md" value="New Features">
                            New Features
                          </Checkbox>
                        </HStack>
                      </CheckboxGroup>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.maintenanceTypes &&
                      ((errors.maintenanceTypes[0] &&
                        errors.maintenanceTypes[1].message) ||
                        (errors.maintenanceTypes[1] &&
                          errors.maintenanceTypes[1].message))}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
              <Button
                type="submit"
                variant="primary"
                alignSelf="flex-end"
                size="md"
                isLoading={isSubmitting}
              >
                Save Changes
              </Button>
            </VStack>
          </form>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default ChapterProfilePage;
