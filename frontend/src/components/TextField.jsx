import { Field, useField } from 'formik';
import { Form, Input } from 'antd';

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Form.Item
            label={label}
            validateStatus={meta.touched && meta.error ? 'error' : ''}
            help={meta.touched && meta.error ? meta.error : ''}
        >
            <Input as={Field} {...field} {...props} />
        </Form.Item>
    );
};

export default TextField;