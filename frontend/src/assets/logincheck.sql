CREATE OR REPLACE FUNCTION check_credentials(username_param TEXT, password_param TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_exists BOOLEAN;
BEGIN
    
    SELECT EXISTS (
        SELECT 1 FROM users WHERE user_name = username_param AND password = password_param
    ) INTO user_exists;

    RETURN user_exists;
END;
$$ LANGUAGE plpgsql;