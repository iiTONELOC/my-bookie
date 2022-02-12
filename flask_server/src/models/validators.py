from ..utils import validate_email, validate_date_time


class Validate:

    @staticmethod
    def email(email):
        is_valid = validate_email(email)
        if not is_valid:
            raise ValueError('Invalid email address')
        else:
            return email

    @staticmethod
    def string(string, length, field_name='Strings', max_length=None):
        if max_length is None:
            if len(str(string)) < length:
                raise ValueError(
                    f"{field_name}'s must be at least {length} characters long.")
            else:
                return string
        elif max_length and length:
            if len(str(string)) < length or len(str(string)) > max_length:
                raise ValueError(
                    f"{field_name}'s must be between {length} and {max_length} characters long.")
            else:
                return string

    @staticmethod
    def date_time(date_time):
        is_valid = validate_date_time(date_time)
        if not is_valid:
            raise ValueError('Invalid Date')
        else:
            return date_time
