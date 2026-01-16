import React, { useState, useEffect } from "react";
import { useCreateDepartment, useUpdateDepartment } from "./useDepartments";
import type { DepartmentFormProps } from "./department.types";
import TextInput from "../../components/TextField";

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  department,
  onSuccess,
  formSubmitRef,
  formResetRef,
}) => {
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const isEditMode = !!department;

  const [formData, setFormData] = useState({
    org_id: "",
    name: "",
    description: "",
    code: "",
    is_active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* --------------------------------------------------
   Sync form when editing
  -------------------------------------------------- */
  useEffect(() => {
    if (department) {
      setFormData({
        org_id: department.org_id,
        name: department.name,
        description: department.description,
        code: department.code,
        is_active: Boolean(department.is_active),
      });
    }
  }, [department]);

  /* --------------------------------------------------
   Handle field change + clear error
  -------------------------------------------------- */
  const handleChange = (key: keyof typeof formData, value: any): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  /* --------------------------------------------------
   Validation
  -------------------------------------------------- */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.org_id.trim()) {
      newErrors.org_id = "Organization ID is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Department name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Department code is required";
    } else if (!/^[A-Z0-9_-]+$/.test(formData.code)) {
      newErrors.code =
        "Code must be uppercase letters, numbers, hyphens, or underscores";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* --------------------------------------------------
   Submit
  -------------------------------------------------- */
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        is_active: Boolean(formData.is_active),
      };

      if (isEditMode && department) {
        await updateDepartment.mutateAsync({
          id: department.id,
          data: payload,
        });
      } else {
        await createDepartment.mutateAsync(payload);
      }

      if (!isEditMode) resetForm();
      onSuccess?.();
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  /* --------------------------------------------------
   Reset
  -------------------------------------------------- */
  const resetForm = (): void => {
    setErrors({});

    if (department) {
      setFormData({
        org_id: department.org_id,
        name: department.name,
        description: department.description,
        code: department.code,
        is_active: Boolean(department.is_active),
      });
    } else {
      setFormData({
        org_id: "",
        name: "",
        description: "",
        code: "",
        is_active: true,
      });
    }
  };

  /* --------------------------------------------------
   Expose refs
  -------------------------------------------------- */
  useEffect(() => {
    if (formSubmitRef) formSubmitRef.current = handleSubmit;
    if (formResetRef) formResetRef.current = resetForm;

    return () => {
      if (formSubmitRef) formSubmitRef.current = null;
      if (formResetRef) formResetRef.current = null;
    };
  }, [formData, department]);

  const mutation = isEditMode ? updateDepartment : createDepartment;

  /* --------------------------------------------------
   UI
  -------------------------------------------------- */
  const inputClass = (error?: string) => `
    w-full px-4 py-2 rounded
    bg-gray-100 dark:bg-[#2c2c2c]
    text-black dark:text-white
    border
    ${error ? "border-red-500" : "border-gray-300 dark:border-[#333333]"}
    focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  return (
    <div className="space-y-5">
      {/* Org ID */}

      <TextInput
        label="Organization ID"
        required
        value={formData.org_id}
        onChange={(value) => handleChange("org_id", value)}
        error={errors.org_id}
        disabled={mutation.isPending}
      />

      <TextInput
        label="Department Name"
        required
        value={formData.name}
        onChange={(value) => handleChange("name", value)}
        error={errors.name}
        disabled={mutation.isPending}
      />

      {/* Code */}
      <TextInput
        label="Department Code"
        required
        value={formData.code}
        onChange={(value) => handleChange("code", value.toUpperCase())}
        error={errors.code}
        disabled={mutation.isPending}
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-white dark:text-gray-300">
          Description *
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          disabled={mutation.isPending}
          className={inputClass(errors.description)}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description}</p>
        )}
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={(e) => handleChange("is_active", e.target.checked)}
          className="w-4 h-4 accent-black dark:accent-white"
        />
        <span className="text-sm dark:text-gray-300">Active Department</span>
      </div>
    </div>
  );
};

export default DepartmentForm;
