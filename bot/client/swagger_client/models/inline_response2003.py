# coding: utf-8

"""
    Elysia Documentation

    Development documentation  # noqa: E501

    OpenAPI spec version: 0.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

import pprint
import re  # noqa: F401

import six

class InlineResponse2003(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    """
    Attributes:
      swagger_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    swagger_types = {
        'name': 'str',
        'rows': 'float',
        'columns': 'float',
        'updates': 'list[object]'
    }

    attribute_map = {
        'name': 'name',
        'rows': 'rows',
        'columns': 'columns',
        'updates': 'updates'
    }

    def __init__(self, name=None, rows=None, columns=None, updates=None):  # noqa: E501
        """InlineResponse2003 - a model defined in Swagger"""  # noqa: E501
        self._name = None
        self._rows = None
        self._columns = None
        self._updates = None
        self.discriminator = None
        self.name = name
        self.rows = rows
        self.columns = columns
        self.updates = updates

    @property
    def name(self):
        """Gets the name of this InlineResponse2003.  # noqa: E501


        :return: The name of this InlineResponse2003.  # noqa: E501
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this InlineResponse2003.


        :param name: The name of this InlineResponse2003.  # noqa: E501
        :type: str
        """
        if name is None:
            raise ValueError("Invalid value for `name`, must not be `None`")  # noqa: E501

        self._name = name

    @property
    def rows(self):
        """Gets the rows of this InlineResponse2003.  # noqa: E501


        :return: The rows of this InlineResponse2003.  # noqa: E501
        :rtype: float
        """
        return self._rows

    @rows.setter
    def rows(self, rows):
        """Sets the rows of this InlineResponse2003.


        :param rows: The rows of this InlineResponse2003.  # noqa: E501
        :type: float
        """
        if rows is None:
            raise ValueError("Invalid value for `rows`, must not be `None`")  # noqa: E501

        self._rows = rows

    @property
    def columns(self):
        """Gets the columns of this InlineResponse2003.  # noqa: E501


        :return: The columns of this InlineResponse2003.  # noqa: E501
        :rtype: float
        """
        return self._columns

    @columns.setter
    def columns(self, columns):
        """Sets the columns of this InlineResponse2003.


        :param columns: The columns of this InlineResponse2003.  # noqa: E501
        :type: float
        """
        if columns is None:
            raise ValueError("Invalid value for `columns`, must not be `None`")  # noqa: E501

        self._columns = columns

    @property
    def updates(self):
        """Gets the updates of this InlineResponse2003.  # noqa: E501


        :return: The updates of this InlineResponse2003.  # noqa: E501
        :rtype: list[object]
        """
        return self._updates

    @updates.setter
    def updates(self, updates):
        """Sets the updates of this InlineResponse2003.


        :param updates: The updates of this InlineResponse2003.  # noqa: E501
        :type: list[object]
        """
        if updates is None:
            raise ValueError("Invalid value for `updates`, must not be `None`")  # noqa: E501

        self._updates = updates

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value
        if issubclass(InlineResponse2003, dict):
            for key, value in self.items():
                result[key] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, InlineResponse2003):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other